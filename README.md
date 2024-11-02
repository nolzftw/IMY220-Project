## How to run docker
docker build -t u21437883 .<br/>
docker run --name u21437883 -p 3000:3000 u21437883<br/>
docker stop u21437883<br/>
docker rm u21437883

## Tailwind & webpack
npx tailwindcss -i ./frontend/src/global.css -o ./frontend/public/output.css --watch
npx webpack --watch
npm start