import openpyxl
 
path = './ProfileCharacteristics.xlsx'
 
wb_obj = openpyxl.load_workbook(path) # To open the workbook, workbook object is created
sheet_obj = wb_obj.active # Get workbook active sheet object from the active attribute
 
max_col = sheet_obj.max_column
max_row = sheet_obj.max_row
queryList = []
for row in range(2, max_row + 1): # skip column titles
    
    rowValues = []
    for col in range(1, max_col + 1):
        cell_obj = sheet_obj.cell(row = row, column = col)
        rowValues.append(str(cell_obj.value))

    query = ("INSERT INTO JobDescriptors (Id, Dimension, Characteristic, Description) "
             "VALUES ({}, {}, {}, {});".format(rowValues[0], rowValues[1], rowValues[2], rowValues[3]))
    print(query)
    queryList.append(query)

    rowValues.clear()

# print(queryList)

# RESOURCES
# https://www.geeksforgeeks.org/python-reading-excel-file-using-openpyxl-module/
# https://blog.piinalpin.com/2020/12/sql-generator/
