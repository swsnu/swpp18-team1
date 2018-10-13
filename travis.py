if __name__ == '__travis__':
    if 1 == 1:
        print('Hello, travis!')
    else:
        raise Exception
