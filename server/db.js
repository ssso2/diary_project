const db = require("mysql2");

const con = db.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

process.on("SIGINT", () => {
    con.end(err => {
        if (err) {
            console.log("종료 실패 : ", err.message);
        } else {
            console.log("종료 성공 : ", con.threadId);
        }

        process.exit(0); //프로세스 정상 종료 =>DB 끝내면서 프로세스도 완전히 다 끝내겠다.
    });
});

module.exports = con.promise(); // 커넥션 풀을 promise 방식으로 리턴
