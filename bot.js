const TelegramBot = require( "node-telegram-bot-api" );
const { exec, which } = require( "shelljs" );
const fs = require( "fs" );
const path = require( "path" );

if ( !which( "yt-dlp" ) )
{
	console.error( "yt-dlp is not installed. Please install it and try again." );
	process.exit( 1 );
}

if ( !which( "instaloader" ) )
{
	console.error( "instaloader is not installed. Please install it and try again." );
	process.exit( 1 );
}

if ( !which( "aria2c" ) )
{
	console.error( "aria2c is not installed. Please install it and try again." );
	process.exit( 1 );
}

const token = process.env.TELEGRAM_BOT_TOKEN;
let allowedUsersArray;
if ( process.env.ALLOWED_USERS )
{
	allowedUsersArray = process.env.ALLOWED_USERS.split( "," );
}

const bot = new TelegramBot( token, { polling: true });
async function sendAndDeleteFiles ( chatId, userFolderPath )
{
	const filesInFolder = fs.readdirSync( userFolderPath );

	if ( filesInFolder.length > 0 )
	{
		for ( const file of filesInFolder )
		{
			const filePath = path.join( userFolderPath, file );
			try
			{
				const fileExtension = path.extname( file ).toLowerCase();

				if ( fileExtension === ".mp4" || fileExtension === ".avi" )
				{
					await bot.sendVideo( chatId, filePath );
				}
				else if ( fileExtension === ".mp3" || fileExtension === ".wav" )
				{
					await bot.sendAudio( chatId, filePath );
				}
				else
				{
					await bot.sendDocument( chatId, filePath );
				}
			}
			catch ( error )
			{
				console.log( error );
			}
			finally
			{
				fs.unlinkSync( filePath );
			}
		}
	}
	else
	{
		await bot.sendMessage( chatId, "No files to send." );
	}
}

// bot.on( "message", async ( msg ) =>
bot.onText( /\/d (.+)/, async ( msg, match ) =>
{
	const chatId = msg.chat.id;
	const { username } = msg.from;
	const firstname = msg.chat.first_name
	const [ , link ] = match;
	const userFolder = username || firstname; // Use username if available, otherwise use firstname
	const userFolderPath = `./downloads/${userFolder}/`;

	if ( allowedUsersArray && !allowedUsersArray.includes( username ) && !allowedUsersArray.includes( firstname ) )
	{
		await bot.sendMessage( chatId, `Sorry ${firstname}, you don't have permissions to download videos.` );
		return;
	}

	if ( !fs.existsSync( "./downloads" ) )
	{
		fs.mkdirSync( "./downloads" );
	}

	if ( !fs.existsSync( userFolderPath ) )
	{
		fs.mkdirSync( userFolderPath );
	}
	// const result = await sendAndDeleteFiles( chatId, userFolderPath );

	// if link include youtu.be or youtube.com
	if ( link.includes( "youtu.be" ) || link.includes( "youtube.com" ) )
	{
		// If it's a YouTube link, use yt-dlp to download the highest quality video
		const cmd = "yt-dlp -f b --write-description  --write-auto-sub --write-subs --embed-subs --write-info-json";
		if ( exec( `cd ${userFolderPath}; ${cmd} "${link}"` ).code !== 0 )
		{
			await bot.sendMessage( chatId, "Error downloading YouTube video" );
		}
	}
	else if ( link.includes( "instagram.com" ) )
	{
		const regex = /\/reels\/([^/]+)/;
		const [ , match ] = link.match( regex );

		const cmd = `instaloader -- -${match}`;
		if ( exec( `cd ${userFolderPath}; ${cmd} "${link}"` ).code !== 0 )
		{
			await bot.sendMessage( chatId, "Error downloading instagram video" );
		}
	}
	else
	{
		const cmd = `aria2c -x 15 "${link}"`;
		if ( exec( `cd ${userFolderPath}; ${cmd} "${link}"` ).code !== 0 )
		{
			await bot.sendMessage( chatId, "Error downloading instagram video" );
		}
	}
	await bot.sendMessage( chatId, "Did my best" );
	await sendAndDeleteFiles( chatId, userFolderPath );

});

bot.onText( /\/y (.+)/, async ( msg, match ) =>
{
	const chatId = msg.chat.id;
	const { username } = msg.from;
	const firstname = msg.chat.first_name;
	const [ , link ] = match;
	const userFolder = username || firstname; // Use username if available, otherwise use firstname
	const userFolderPath = `./downloads/${userFolder}/`;

	if ( allowedUsersArray && !allowedUsersArray.includes( username ) && !allowedUsersArray.includes( firstname ) )
	{
		await bot.sendMessage( chatId, `Sorry ${firstname}, you don't have permissions to download YouTube videos.` );
		return;
	}

	if ( !fs.existsSync( "./downloads" ) )
	{
		fs.mkdirSync( "./downloads" );
	}

	if ( !fs.existsSync( userFolderPath ) )
	{
		fs.mkdirSync( userFolderPath );
	}

	// Use yt-dlp to download the highest quality video
	const cmd = "yt-dlp -f b";
	if ( exec( `cd ${userFolderPath}; ${cmd} "${link}"` ).code !== 0 )
	{
		await bot.sendMessage( chatId, "Error downloading YouTube video" );
	}
	// await bot.sendMessage( chatId, "Did my best" );
	await sendAndDeleteFiles( chatId, userFolderPath );
});