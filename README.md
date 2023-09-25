# FormTests

Google apps script examples for dealing with Forms:

- All form responses are put into one Spreadsheet (responseSS) in a sheet linked ot the Form
- Each user has a follder named by ${userID} - ${userName} from the form.
- Each response is then written into a Spreadsheet (userSS), which is named by ${userID} - ${userName} and to the formUserSheetName which is the same as the sheet in the responseSS.
- The userFolderName, userSS and formUserSheetName are created if they do not exist.