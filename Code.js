/**
 * All form responses are put into one Spreadsheet (responseSS) in a sheet linked ot the Form
 * Each user has a follder named by ${userID} - ${userName} from the form. 
 * Each response is then written into a Spreadsheet (userSS), which is named by ${userID} - ${userName} and to the formUserSheetName which is the same as the sheet in the responseSS.
 * The userFolderName, userSS and formUserSheetName are created if they do not exist.
 * 
*/
const userIDsFolderID = "1duKQcW-7V3YySNIW3A4JrixS82c2HR7z"; // https://drive.google.com/drive/folders/1duKQcW-7V3YySNIW3A4JrixS82c2HR7z?usp=drive_link (UserIDs folder)
const repsonseSheetID = "1eKTGukeYm27hdyvS5Zt3miGTVvs_xh4RHAyJmVa7t-0" // https://docs.google.com/spreadsheets/d/1eKTGukeYm27hdyvS5Zt3miGTVvs_xh4RHAyJmVa7t-0/ (RepsonseSheet)
let responseSS = SpreadsheetApp.openById(repsonseSheetID);
//let sheetName = 'Form TestUserIDs';
//let repsonseSheet = responseSS.getSheetByName(sheetName);


function testARow() {
  const testRow = 6;
  processForm(testRow, repsonseSheet)
}


// when form submissions happens runt his function
function onFormSubmit(e) {
  // should be a row of data
  const eventRange = e.range;
  // should be a row of data
  const evenValues = e.namedValues;
  Logger.log(`evenValues: ${evenValues}`);
  // Get the active sheet.
  const formSheetName = eventRange.getSheet().getName();
  Logger.log(`formSheetName: ${formSheetName}`);
  const formSheet = responseSS.getSheetByName(formSheetName);
  const eventRow = eventRange.getRow();

  Logger.log(`eventRow: ${eventRow}`);
  processForm(eventRow, formSheet);
}

function processForm(aRow, triggerSheet) {
  Logger.log(`aRow: ${aRow}`);
  Logger.log(`typeof value: ${typeof aRow}`);

  var valuesToCopy = triggerSheet.getRange(aRow, 1, 1, triggerSheet.getLastColumn()).getValues();
  // get userID and name from repsonseSheet
  let userName = valuesToCopy[0][1];
  let userID = valuesToCopy[0][2];
  // set triggerSheetName
  let userFolderName = `${userID} - ${userName}`;
  // go find Folder that starts with userID
  var userFolderID = getOrCreateFolder(userIDsFolderID, userID, userFolderName);
  Logger.log(`userFolderID: ${userFolderID}`);
  let userFileName = `${userID} - ${userName}`
  // go find SpreadSheet that starts with userID
  var userFileID = checkForFileInFolder(userFileName, userFolderID);
  if ((!userFileID) || userFileID == 'undefined') {
    // create spreadsheet for userID
    userFileID = createNewSheetInFolder(userFolderID, userFileName);
  }
  Logger.log(`userFileID: ${userFileID}`);
  var userSS = SpreadsheetApp.openById(userFileID);
  // this should be the sheet in responseSS which we will add a sheet by the same name in userSheet 
  const formUserSheetName = triggerSheet.getName();
  var userSheet = userSS.getSheetByName(formUserSheetName);
  Logger.log(`formUserSheetName: ${formUserSheetName}`);
  // check if sheet exist
  if (userSheet == null) {
    var userSheet = userSS.getSheetByName(formUserSheetName);
    var userSheet = userSS.getSheetByName(formUserSheetName);
    Logger.log(`formUserSheetName is null so adding sheet with Name: ${formUserSheetName} to ${userSS.getName()}`)
    userSheet = userSS.insertSheet();
    userSheet.setName(formUserSheetName);
  }
  // copy the row from event to userSheet
  copyRow(triggerSheet, aRow, userSheet);
  Logger.log(`Values copied from : ${triggerSheet.getName()} Row: ${aRow} to ${userSS.getName()}:${userSheet.getName()}`);
}

/**
 * copies last row of sheetX to an appended row appended to sheetY
 * @param {*} sheetX 
 * @param {*} sheetY 
 */
function copyRow(sheetX, rowToCopy, sheetY) {
  Logger.log(`Copying row ${rowToCopy} from Sheet: ${sheetX.getName()}`);
  var valuesToCopy = sheetX.getRange(rowToCopy, 1, 1, sheetX.getLastColumn()).getValues();
  Logger.log(`Values: ${valuesToCopy}`);
  let toRow = sheetY.getLastRow() + 1;
  Logger.log(`Copying To row ${toRow} on Sheet: ${sheetY.getName()}`);
  sheetY.getRange(toRow, 1, 1, valuesToCopy[0].length).setValues(valuesToCopy);
}


/**
 * Checks if the folder for that starts with folderStartsWith docs exists, 
 * returns folderID 
 * or creates it if and returns folderID
 * folderid name is like: 2021-board-operations
  * @param {string} folderID - the folderID of the parent folder
  * @param {string} folderName - year for folder if null ignore and use 
  * @param {string} folderStartsWith - year where thie document will be stored
  * @return {string} folderID
  * 
 * @return {*} Drive folder ID for the app.
 */
function getOrCreateFolder(folderID, folderStartsWith, newFolderName) {
  const folders = DriveApp.getFolderById(folderID).getFolders(); // Get all folders in the parent folder
  // loop though the folders and check if the folderStartsWith folder exists
  while (folders.hasNext()) {
    let folder = folders.next();
    var thisFolderName = folder.getName();
    if (folderStartsWith) {
      if (folder.getName().startsWith(folderStartsWith)) {
        Logger.log(`Found Exitisting Folder ${thisFolderName} with ID: ${folder.getId()}`)
        return folder.getId();
      }
    } //folderStartsWith
  }
  // If the folder doesn't exist, creates one
  var dir = DriveApp.getFolderById(folderID);
  let newFolder = dir.createFolder(newFolderName);
  newFolder.setDescription('Created by Apps Script App');
  return newFolder.getId();
}

/**
 * Checks for a file with the mathing the provided name exists
 * @param {*} filename (Matches first 5 charators)
 * @param {*} folderID 
 */
function checkForFileInFolder(filename, folderID) {
  var folder = DriveApp.getFolderById(folderID);
  var files = folder.getFiles();
  while (files.hasNext()) {
    let file = files.next();
    Logger.log(`file.getName(): ${file.getName()}`)
    // Check if the file name matches the one we're looking for
    if (file.getName().toLowerCase().startsWith(filename.toLowerCase(), 0, 5)) {
      // return file ID if it does
      return file.getId();
    }
  }
  return;
}

/**
 * createNewSheetInFolder
 * @param {*} destinationFolderID 
 * @param {*} newDocName 
 */
function createNewSheetInFolder(destinationFolderID, newDocName) {
  Logger.log(`Creating: ${newDocName}`);
  var resource = {
    title: newDocName,
    mimeType: MimeType.GOOGLE_SHEETS,
    parents: [{ id: destinationFolderID }]
  }
  var fileJson = Drive.Files.insert(resource);
  return fileJson.id
}
