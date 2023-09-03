Running
1. Run locally using yarn run start:dev
This way the server will reload each time a change has been made
Pro tip: Maybe disable database sync (.env -> DB_SYNC) to not check for changed schema

Issues/workarounds
1. After build static files are not copied
When adding static files (.env, email templates, ini files, etc.) need to add to nest-cli.json
2. Why multiple .env files
Basically for ease knowing a certain config for that environment.
It can be overridden in GDS
.env.docker - environment example when running within docker container