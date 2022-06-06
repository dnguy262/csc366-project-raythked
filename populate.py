import subprocess
from os.path import exists
from os import chdir
from excel_parse.manager import executeQuery

# This file populates our DB w/ excel and ONET data.
def executeFile(filename):
    with open(filename, 'r') as file:
        queries = [q.strip('\n') for q in file.readlines()]
        
        # Handling another format for the file
        if 'onet' in filename:
            queries = [' '.join(queries)]

        for query in queries:
            try:
                executeQuery(query)
            except:
                print(query)
                executeQuery(query)

        print(f"Done inserting from {filename}")

def main():

    # Drop tables (we don't support updates yet)
    chdir("excel_parse") # change directory
    subprocess.run("python3 manager.py -d".split())

    # Creates tables
    subprocess.run("python3 manager.py -c".split())

    filenames = ['./excel_parse/insert_stms_excel.sql', './onet-parse/sql/onet-job-info.sql', './onet-parse/sql/onet-job-profiles.sql']

    chdir("../") # come back to original directory

    # Creates insert file from excel, if doesn't exists
    if not exists(filenames[0]):
        subprocess.run("python3 excel_parse/parse.py".split())

     # Creates insert file from ONET, if doesn't exists
    if not exists(filenames[1]) or not exists(filenames[2]):
        chdir("./onet_parse")
        subprocess.run("cd ./onet-parse && yarn run parse:script".split())
        chdir("../")

    # Executing insert stmts
    for filename in filenames:
        try:
            executeFile(filename)
        except:
            print(f"error in {filename}")
    
    # Creates insert file from onet excel, if doesn't exist.
    # This needs to have tables (such as Profiles) already populated.
    if not exists('excel_parse/insert_stms_onet.sql'):
        chdir("./excel_parse")
        subprocess.run("python3 parse_onet_mapping.py".split())
        chdir("../")
        
    executeFile('./excel_parse/insert_stms_onet.sql')

if __name__ == '__main__':
    main()