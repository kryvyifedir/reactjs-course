## Submitting new note (SPA)
```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Status 200
    deactivate server

    Note right of browser: Browser side JS re-renders the list once it is aware of the change
```
