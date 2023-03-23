import argparse

def main():
    parser = argparse.ArgumentParser(description='Hello World program with an argument.')
    parser.add_argument('arg', help='argument to be added to the Hello, World! message')
    args = parser.parse_args()
    print("Hello, world! {}".format(args.arg))

if __name__ == "__main__":
    main()
