url: http://localhost:3000/api/task/

auth ==> Headers {
    login: "user",
    password: "user"
}

get Todos ==> GET

delete all Todos ==> DELETE

delete some Todo ==> DELETE + url+Todo.id 

add Todo ==> POST + body {
    title: String,
    done: Boolean
}

mark done Todo ==> PUT + url+Todo.id + body {
    done: true
}

mark undone Todo ==> PUT + url+Todo + body {
    done: false
}



Made by Andrii Peliak