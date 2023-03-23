import argparse
from tensorflow import keras
from numpy.random import seed
seed(1)
#from tensorflow import set_random_seed
#set_random_seed(2)
import sqlite3
import numpy as np
import pandas as pd
from pandas import DataFrame
from sklearn.decomposition import PCA
from create_feature_vector import creat_feature_vector

vector_size = 572
event_num = 65

#print feature vector using arg in terminal(in this project using node child_process)

def main():
    parser = argparse.ArgumentParser(description='Hello World program with an argument.')
    parser.add_argument('drugA', help='drug name used first drug in DDI model')
    parser.add_argument('drugB', help='drug name used second drug in DDI model')

    args = parser.parse_args()

    drugA = [args.drugA]
    drugB = [args.drugB]
    #drugA = ['Abemaciclib']
    #drugB = ['Amiodarone']

    conn = sqlite3.connect("event.db") #db연결
    df_drug = pd.read_sql('select * from drug;', conn)
    feature = ['smile']
    size = vector_size

    print('여기까지 진행', drugA, drugB)

    new_feature = creat_feature_vector(df_drug, feature, size, drugA, drugB)
    print(new_feature)
    
if __name__ == "__main__":
    main()
