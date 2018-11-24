### Description

Small CRUD application

- Server: Node.js
- Client: Vue.js, Vuetify
- Database: Postgres

### Installation

Create relevant tables with query below. Run the import beers script to generate different kinds of beers and import them into the database.

```sql
create schema CRUD;

create table CRUD.beer (
	id serial not null,
	name varchar(64) not null,
	company varchar(128) not null,
	style varchar(64) not null,
	percentage float(2) not null,
	rating float(1) not null,
	constraint beer_pkey primary key (id)
);
```
Install packages and then run the server. Browse to ```http://localhost:4401``` in your web browser.

```sh
$ npm install
$ npm run build
$ node scripts/importBeers.js
$ node index.js
```

### Bugs

- Once an item is selected in the autocomplete component, that value isn't found in the list when the value in the text field is changed