export const limitedCommand = [
    {
        "name": "role",
        "description": "Agrega/remueve roles especiales del usuario.",
        "options": [
            {
                "name": "nsfw",
                "description": "Agrega/quita acceso a los canales nsfw.",
                "type": 1
            },
            {
                "name": "actualizaciones",
                "description": "Recibe/remueve los pings de los canales de servidor.",
                "type": 1
            },
            {
                "name": "noticias",
                "description": "Recibe/remueve los pings de los canales de noticias de Wolfy.",
                "type": 1
            },
            {
                "name": "eventos",
                "description": "Recibe/remueve los pings de los canales de eventos del servidor.",
                "type": 1
            },
            {
                "name": "alianzas",
                "description": "Recibe/remueve los pings de los canales de alianzas del servidor.",
                "type": 1
            }
        ]
    },
    {
        "name": "coded",
        "description": "Calcula una expresion con este comando.",
        "options": [
            {
                "name": "codigo",
                "description": "El codigo a evaluar.",
                "type": 3,
                "required": true
            }
        ]
    }    
]