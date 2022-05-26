import subprocess
from os.path import exists
from manager import executeQuery

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
    subprocess.run("python3 manager.py -d".split())

    # Creates tables
    subprocess.run("python3 manager.py -c".split())

    filenames = ['./insert_stms_excel.sql', '../onet-parse/sql/onet-job-info.sql', '../onet-parse/sql/onet-job-profiles.sql']

    # Creates insert file from excel, if doesn't exists
    if not exists(filenames[0]):
        subprocess.run("python3 parse.py".split())

     # Creates insert file from ONET, if doesn't exists
    if not exists(filenames[1]) or not exists(filenames[2]):
        subprocess.run("cd ../onet-parse && yarn run parse:script".split())

    # Executing insert stmts
    for filename in filenames:
        executeFile(filename)
    
    # Creates insert file from onet excel, if doesn't exists.
    # This needs to have tables (such as Profiles) already populated.
    if not exists('insert_stms_onet.sql'):
        subprocess.run("python3 parse_onet_mapping.py".split())
        
    executeFile('insert_stms_onet.sql')

if __name__ == '__main__':
    main()