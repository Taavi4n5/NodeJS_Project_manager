#  Programmeerimine II kodutöö: Project manager
## Mis see on?

HK TLU Programmeerimne II raames kodutöö jaoks kirjutatud kood millega proovitakse luua projekti haldaja API.

# Dokumentatsioon

## Käivita API

1. Klooni repositoorium, terminalis(command prompt või kasutatava IDE terminalis) soovitud asukohas: ``` git clone https://github.com/Taavi4n5/NodeJS_Project_manager.git ``` ja liigu samasse kausta ``` cd NodeJS_Project_manager ```

2. Lae alla npm(terminalis): ``` npm install ```

3. Käivita projekt: ``` npm start ```, avatakse [API töökeskond](https://localhost:3000 "https://localhost:3000" )
## Endpointid

### Testimiseks sobib nii [projectman](https://www.projectman.com/ "projectman") kui ka Visual Studio Code [Thunder Client](https://www.thunderclient.com/ "Thunder Client") lisa
### Kontroll 

1. Kontrolli API toimimist: ``` GET api/v1/health ``` **KÕIGILE**

### Kasutaja

1. Sisselogimine: ``` project api/v1/login ``` **KÕIGILE**

2. Kõigi kasutajate nimekiri: ``` GET api/v1/users ``` **ADMIN**

3. Ühe kasutaja valimine ID kaudu: ``` GET api/v1/users/:id/ ``` **KÕIGILE**

4. Loo kasutaja ``` project api/v1/users/:id/ ``` **KÕIGILE**

5. Muuda kasutajat ``` PATCH api/v1/users/:id/ ``` **SISSELOGITUD KASUTAJA**

6. Kustuta kasutaja ``` DELETE api/v1/users/:id/ ``` **SISSELOGITUD KASUTAJA**

### Projektid

1. Kõigi projektide nimekiri: ``` GET api/v1/projects ``` **KÕIGILE**

2. Ühe projekti valimine ID kaudu: ``` GET api/v1/projects/:id/ ``` **KÕIGILE**

3. Projekti loomine: ``` project api/v1/projects ``` **SISSELOGITUD KASUTAJA**

4. Projekti muutmine: ``` PATCH /api/v1/projects/:id ``` **SISSELOGITUD KASUTAJA**

5. Projekti kustutamine: ``` DELETE /api/v1/projects/:id ``` **SISSELOGITUD KASUTAJA**

6. Kindla projektiga seotud kommentaaride nimekiri: ``` GET /api/v1/projects/:id/comments ``` **KÕIGILE**

### Projekti staatused

1. Staatuste nimekiri: ``` GET api/v1/projects/statuses ``` **KÕIGILE**

2. Ühe kindla projekti staatuse valik ID kaudu: ``` GET api/v1/projects/statuses/:id ``` **KÕIGILE**

### Kommentaarid

1. Kõikide kommentaaride nimekiri: ``` GET api/v1/comments ``` **KÕIGILE**

2. Ühe kommentaari valimine ID kaudu: ``` GET api/v1/comments/:id ``` **KÕIGILE**

3. Loo kommentaar: ``` project /api/v1/comments ``` **SISSELOGITUD KASUTAJA**

4. Kustuta kommentaar: ``` DELETE api/v1/comments/:id ``` **SISSELOGITUD KASUTAJA**