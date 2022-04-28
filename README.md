This is a school project holding a website created with Next.js and React.

You can find the webpage at [weather.zevon.dk](http://www.weather.zevon.dk/).

**All kubernetes is done with [k3s](https://k3s.io/).**

The github workflow automatic builds amd64 and arm64 images and pushes them to [DockerHub](https://hub.docker.com/).

# Purpose

The app is supposed to calculate and tell you the current price of energy in Denmark and then automate command task the require energy. This is done because the price is cheaper when the energy is greener.

# Getting started

You can host and change the website yourself if you clone the repository.

You do so by following the instructions below:

1.  Clone the repository to your local machine.

    -   Install yarn if you don't already have it with `npm install -g yarn`.

2.  Run the command `yarn` (Same as `npm install`).

3.  Fill out a `.env` file following the `.env.example` file.

4.  Run `prisma generate` to generate prisma client.

5.  Run `yarn dev` (Same as `npm run dev`).

6.  Go to [localhost:3000](https://localhost:3000/).
