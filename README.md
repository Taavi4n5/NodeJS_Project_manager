#  Programmeerimine II kodutöö: Project manager
## Mis see on?

HK TLU Programmeerimne II raames kodutöö jaoks kirjutatud kood millega proovitakse luua projekti haldaja API.

# Dokumentatsioon
## Endpointid
### Kontroll 

1. Kontrolli API toimimist: ``` GET api/v1/health ```

### Kasutaja

1. Kõigi kasutajate nimekiri: ``` GET api/v1/users ```

2. Ühe kasutaja valimine ID kaudu: ``` GET api/v1/users/:id/ ```

3. Loo kasutaja ``` POST api/v1/users/:id/ ```

4. Muuda kasutajat ``` PATCH api/v1/users/:id/ ```

5. Kustuta kasutaja ``` DELETE api/v1/users/:id/ ```

### Projektid

1. Kõigi projektide nimekiri: ``` GET api/v1/projects ```

2. Ühe projekti valimine ID kaudu: ``` GET api/v1/projects/:id/ ```

3. Projekti loomine: ``` POST api/v1/projects ```

4. Projekti muutmine: ``` PATCH /api/v1/projects/:id ```

5. Projekti kustutamine: ``` DELETE /api/v1/projects/:id ```

6. Kindla projektiga seotud kommentaaride nimekiri: ``` GET /api/v1/projects/:id/comments ```

### Projekti staatused

1. Staatuste nimekiri: ``` GET api/v1/projects/statuses ```

2. Ühe kindla projekti staatuse valik ID kaudu: ``` GET api/v1/projects/statuses/:id ```

### Kommentaarid

1. Kõikide kommentaaride nimekiri: ``` GET api/v1/comments ```

2. Ühe kommentaari valimine ID kaudu: ``` GET api/v1/comments/:id ```

3. Loo kommentaar: ``` POST /api/v1/comments ```

4. Kustuta kommentaar: ``` DELETE api/v1/comments/:id ```