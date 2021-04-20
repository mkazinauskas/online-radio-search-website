# online-radio-search-website
Website for Online Radio Search

# How to run
1. `npm install`
1. `npm run dev` 

# How to build and run docker image
1. `docker build -t ors-website .`
1. `docker-compose up`

To close the app press `ctrl + c`

TODO:
1. Play radio station button
1. Sitemap
1. App download
1. Go to next page of songs in radio station view.


docker run -p 5000:3000 -e NEXT_PUBLIC_CURRENT_ENV=Dockerizedaa ors-website

