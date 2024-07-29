if [ -f .env ]; then
    export $(cat .env | xargs)
fi

git pull

npm run build
