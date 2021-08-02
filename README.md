# WolfyBot

Bot dedicado al servidor de [YoSoyWolfy](https://discord.gg/yosoywolfy), este es open source y puede ser hosteado en tu propia pc siguiendo los siguientes pasos.

### Requerimientos:
1- Tener [`node 14.x`](https://nodejs.org/es/) o posteriores en tu pc instalado.

2- Tener [git](https://git-scm.com/) instalado en tu pc para poder hacer `git clone`.

3- Tener algún IDE o editor de código instalado. (opcional, pero no es recomendable hacerlo desde el bloc de notas)



### Pasos

1- Primero abre el `cmd` y en la carpata donde quieras que este ubicado, ubicate con el cmd.

2- Luego, pon el siguiente comando en tu `cmd`.
```shell
git clone https://github.com/Chere3/JasperBot
```
3- Luego de esto, abre la carpeta donde se puso y crea el siguiente archivo. `.env`, dentro de él. Pondras lo siguiente: 
```s
TOKEN=
MONGO_URI=
```
 
4- En token, inserta el token del bot. Si no sabes como [ve este tutorial](https://portalmybot.com/guia/mybot/cuenta-discord#:~:text=El%20token%20es%20secreto%2C%20como,Token%20Secreto%20de%20su%20BOT.), y en mongo URI, saca tu uri de MONGODB (este servíra para poder almacenar tus datos.)

5- Después de hacer todos esos pasos satisfactoriamente, solo queda poner el siguiente comando en tu cmd. 
```shell
npm i -g nodemon && yarn test
```

6- Y listo!, tu bot estará encendido y funcionando. Debería de mostrar esto en consola:

```shell
[Log] La shard 1 fue creada.
[Log] La shard 1 esta lista.
[Log] Se ha conectado a la database satisfactoriamente.
```

Si tienes alguna duda me puedes contactar a mi discord. [Cheree#0800](https://discord.com/users/852588734104469535)