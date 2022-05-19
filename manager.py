import argparse
import pymysql

def executeQuery(query):
    # connection = pymysql.connect(
    #             user     = "group5a",
    #             password = "_}2nSW6'%?3hyr9Z",
    #             host     = "https://labthreesixsix.com",
    #             db       = "group5a",
    # )
    connection = pymysql.connect(
        user     = "jcavalca466",
        password = "jcavalca466985",
        host     = "localhost",
        db       = "jcavalca466",
        port     = 9090 # comment out this if running on frank
    )
    with connection.cursor() as cursor:
        cursor.execute(query)
    connection.commit()
    connection.close()
  
    
def createTables():
    with open("DB-setup-raythked.sql", 'r') as file:
        queries = [line.strip('\n') for line in file.readlines()]
        
        for query in queries:
            executeQuery(query)

def dropTables():
    with open("DB-cleanup-raythked.sql", 'r') as file:
        queries = [line.strip('\n') for line in file.readlines()]
        
        for query in queries:
            executeQuery(query)

def main():
    parser = argparse.ArgumentParser(description='Creates all DB tables if any does not exist.')
    parser.add_argument('-c', action='store_true')
    parser.add_argument('-d', action='store_true')
    args = parser.parse_args()

    if args.c:
        print("Creating tables ...")
        createTables()
        print("Done")
    
    elif args.d:
        print("Dropping tables ...")
        dropTables()
        print("Done")
    
    else:
        print("USAGE: python3 manager.py [-c | -d]")


if __name__ == '__main__':
    main()