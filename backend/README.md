TODO: Voeg onderstaande functionaliteit toe

In jullie front end staat een login pagina. Deze login pagina doet een verzoek naar deze back end.

Jullie moeten zelf de end point uitwerken. De front end verwacht nu nog een echo te krijgen met de verstuurde log in gegevens van de gebruiker.

Eerst set van constraints

1. Er wordt geprogrammeerd in TypeScript
2. Front-end bestaat alleen uit HTML, CSS en JavaScript (transpiled uit TypeScript)
3. Je mag geen gebruik maken van libraries en frameworks in de front-end
4. Back-end structuur wordt aangehouden zoals geven


## Project Directory

├── src/
│   ├── server.ts                    # Entry point & Express app
│   ├── controllers/                 # Request/Response handling layer
│   │   └── foocontroller.ts
│   ├── business/                    # Business logic layer
│   │   ├── model/                   # Business domain models
│   │   │   └── foo.ts
│   │   └── service/                 # Business services
│   │       └── ServiceFoo.ts
│   ├── data/                        # Data access layer
│   │   ├── Interface/               # Data access interfaces
│   │   │   ├── crudInterface.ts
│   │   │   └── mysqlcrudinterface.ts
│   │   └── models/                  # Data models (database entities)
│   │       ├── foo.ts
│   │       └── bar.ts
│   └── util/                        # Utility classes & helpers
│       ├── singletonfoo.ts          # Singleton located here
│       ├── database.ts              # MySQL connection pool
│       └── JSONObjects.ts           # Data transfer objects
