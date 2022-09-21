# Marvel Back

### Quick start

```
npm i
npx nodemon
```

## Models

- User

## Character routes

<table>
<thead>
<tr>
<th>Route</th><th>Type</th><th>Query / Body / Params</th><th>User connected</th>
</tr>
</thead>
<tbody>
<tr><td>/characters</td><td>GET</td><td>limit, name, skip</td><td>No</td></tr>
<tr><td>/character/:characterId</td><td>GET</td><td>characterId</td><td>No</td></tr>
</tbody>
</table>

## Comics routes

<table>
<thead>
<tr>
<th>Route</th><th>Type</th><th>Query / Body / Params</th><th>User connected</th>
</tr>
</thead>
<tbody>
<tr><td>/comics</td><td>GET</td><td>limit, title, skip</td><td>No</td></tr>
<tr><td>/comics/:characterId</td><td>GET</td><td>characterId</td><td>No</td></tr>
</tbody>
</table>

## User routes

<table>
<thead>
<tr>
<th>Route</th><th>Type</th><th>Query / Body / Params</th><th>User connected</th>
</tr>
</thead>
<tbody>
<tr><td>/user/signup</td><td>POST</td><td>username, email, password</td><td>No</td></tr>
<tr><td>/user/login</td><td>POST</td><td>email, password</td><td>No</td></tr>
<tr><td>/user/favorites</td><td>GET</td><td></td><td>Yes</td></tr>
<tr><td>/user/favoritesCharacter</td><td>POST</td><td>id, urlPic, name</td><td>Yes</td></tr>
<tr><td>/user/favoritesComics</td><td>POST</td><td>id, urlPic, title</td><td>Yes</td></tr>
</tbody>
</table>
