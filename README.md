## IMDB Rest API

- Busca de filmes por título
- Busca de filmes por categoria
- Busca de filmes por ano
- Visualização de detalhes
- Visualização da nota de um filme
- Inserção de um filme
- Exclusão de um filme
- Atualização de um filme


## Uso:
Aviso: Antes de rodar a API, rode o projeto de integração!<br>

Baixe a imagem Docker da API:<br>
`docker run --name api -p 5000:5000 -d louiscavalcante/imdb-api:latest`

---
Busca de filmes por título, categoria e ano.<br>
Com visualização dos detalhes e notas do filme.<br>
PS: Foi utilizado a mesma query para simplificar.<br>
Método `GET`<br>
http://localhost:5000/movies?find=test<br>

---
Inserção de um filme: <br>
Método `POST`<br>
http://localhost:5000/add<br>
```
{
	"titletype": "short",
	"primarytitle": "test create",
	"originaltitle": "test",
	"isadult": 0,
	"startyear": "1111",
	"endyear": "\\N",
	"runtimeminutes": 40,
	"genres": "Romance",
}
```

---
Exclusão de um filme passando a ID como parametro na url (Também deleta as notas junto):<br>
Método `DELETE`<br>
http://localhost:5000/delete/tt0000001<br>

---
Atualização de um filme passando a ID como parâmetro na url:<br>
Método `PUT`<br>
http://localhost:5000/update/tt0000001<br>
```
{
	"titletype": "short",
	"primarytitle": "test update",
	"originaltitle": "teste",
	"isadult": 0,
	"startyear": "1111",
	"endyear": "\\N",
	"runtimeminutes": 40,
	"genres": "Romance,Drama"
}
```
