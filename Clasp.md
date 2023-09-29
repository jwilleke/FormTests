# Clasp usages

[Use the command line interface with clasp](https://developers.google.com/apps-script/guides/clasp)

[Running code is within Clasp](https://script.google.com/home/projects/1Ws3tqffyCGizpHnw6tp9JvIp_74Cb_BjZklEeYRx_Zfb5c_MFEGOrGSz/edit)

[clasp - The Apps Script CLI - Codelab](https://codelabs.developers.google.com/codelabs/clasp#0)

[Claps GitHub](https://github.com/google/clasp)

``` bash
Usage: clasp <command> [options]

clasp - The Apps Script CLI

Options:
  -v, --version                               output the current version
  -A, --auth <file>                           path to an auth file or a folder with a '.clasprc.json' file.
  -I, --ignore <file>                         path to an ignore file or a folder with a '.claspignore' file.
  -P, --project <file>                        path to a project file or to a folder with a '.clasp.json' file.
  -h, --help                                  display help for command

Commands:
  login [options]                             Log in to script.google.com
  logout                                      Log out
  create [options]                            Create a script
  clone [options] [scriptId] [versionNumber]  Clone a project
  pull [options]                              Fetch a remote project
  push [options]                              Update the remote project
  status [options]                            Lists files that will be pushed by clasp
  open [options] [scriptId]                   Open a script
  deployments                                 List deployment ids of a script
  deploy [options]                            Deploy a project
  undeploy [options] [deploymentId]           Undeploy a deployment of a project
  version [description]                       Creates an immutable version of the script
  versions                                    List versions of a script
  list [options]                              List App Scripts projects
  logs [options]                              Shows the StackDriver logs
  run [options] [functionName]                Run a function in your Apps Scripts project
  apis [options]                              List, enable, or disable APIs
    list
    enable <api>
    disable <api>
  setting|settings [settingKey] [newValue]    Update <settingKey> in .clasp.json
  *                                           Any other command is not supported
  paths                                       List current config files path
  help [command]                              display help for command
  ```
