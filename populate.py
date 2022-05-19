import subprocess
from manager import executeQuery

def main():

    # Creates tables, if necessary
    subprocess.run("python3 manager.py -c".split())

    # Creates files w/ insert stmts
    subprocess.run("python3 parse.py".split())

    # Executing insert stmts
    filenames = ['./insert_stms_excel.sql']

    for filename in filenames:
        with open(filename, 'r') as file:
            queries = [q.strip('\n') for q in file.readlines()]
            for query in queries:
                executeQuery(query)

if __name__ == '__main__':
    main()