import pymysql

# Executes any Query, except select
def executeQuery(query):
    connection = pymysql.connect(
                user     = "group5a",
                password = "_}2nSW6%?3hyr9Z",
                host     = "mysql.labthreesixfive.com",
                db       = "group5a",
                port     = 3306
    )
    with connection.cursor() as cursor:
        cursor.execute(query)
    connection.commit()
    connection.close()

# Executes any Select Query
def executeSelectQuery(query):
    connection = pymysql.connect(
                user     = "group5a",
                password = "_}2nSW6%?3hyr9Z",
                host     = "mysql.labthreesixfive.com",
                db       = "group5a",
                port     = 3306
    )
    with connection.cursor() as cursor:
        cursor.execute(query)
    connection.commit()
    return cursor.fetchall()