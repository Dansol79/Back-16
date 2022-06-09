export const options = {
    client: "mysql",
    connection: {
        host:'127.0.0.1',
        user:'root',
        password:'password',
        database:'desafio8'
    }

}
export const sqlite ={
    client: "sqlite3",
    connection: {
           filename: "./db.sqlite"
      },
      useNullAsDefault: true
    }
