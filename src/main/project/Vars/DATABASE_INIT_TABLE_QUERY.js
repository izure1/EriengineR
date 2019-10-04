export default 
`

  CREATE TABLE IF NOT EXISTS locale (id TEXT, name TEXT, def INTEGER);
  CREATE TABLE IF NOT EXISTS text (id TEXT, type TEXT, content TEXT, locale TEXT);

`