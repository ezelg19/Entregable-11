class Author {
    constructor(nombre, apellido, edad, alias, id=1) {
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.alias = alias
        this.id = id
        this.newAuthor()
    }
    newAuthor(){
        this.id++
    }
}