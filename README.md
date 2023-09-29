# FormTests

Code examples for mutiple Googe Forms feeding into individual sheets.

## Resoruces

- [Google Drive Folder](https://drive.google.com/drive/folders/1sKLhpXC6pfsLnQEr_gUgknHP91Go9VLW?usp=drive_link)
- [Google Code Editor](https://script.google.com/u/0/home/projects/18ktQ_P-3Kd66FC_x3bTWMG6GUqT0hPL4TN94DzrqNE4_xtKlvFL5m-iS/edit)
- [GitHub Repo](https://github.com/jwilleke/FormTests)
- [Test UserID (Responses)](https://docs.google.com/spreadsheets/d/1eKTGukeYm27hdyvS5Zt3miGTVvs_xh4RHAyJmVa7t-0/edit?usp=sharing)
- [Test Userid (Form)](https://docs.google.com/forms/d/e/1FAIpQLSeSRHn57ENc5oK73eedtK-pwQhkIzxW04dhEdAZvrjtkAEEdQ/viewform?usp=sharing)
- [TestUsers2 (Form)](https://docs.google.com/forms/d/e/1FAIpQLScLpkkw-WjK7KWDRV5Z-Hh1AbmQDKV11thawBMUUlHcRkCzUQ/viewform?usp=sharing)
- Sheet scriptID: 18ktQ_P-3Kd66FC_x3bTWMG6GUqT0hPL4TN94DzrqNE4_xtKlvFL5m-iS

## Repositories use GitHub and CLASP

[My Using Clasp Doc](https://github.com/jwilleke/FormTests/blob/master/Clasp.md)

Always use:

```bash
clasp pull
clasp push
# then
git push
```

Google apps script examples for dealing with Forms:

- All form responses are put into one Spreadsheet (responseSS) in a sheet linked ot the Form
- Each user has a follder named by ${userID} - ${userName} from the form.
- Each response is then written into a Spreadsheet (userSS), which is named by ${userID} - ${userName} and to the formUserSheetName which is the same as the sheet in the responseSS.
- The userFolderName, userSS and formUserSheetName are created if they do not exist.