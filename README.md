# [Savelink](https://savelink.vercel.app)
A web app & PWA to safely store your favourite/important links from all across the web in one place, for ease of access and categorising.
# Why? — Project Overview
I realised i send links to myself to save a lot for future reference but they get lost when they aren't categorised properly and there's no standalone place to visit those links, so i thought it would be a cool idea to build a project around that to solve my problem and inprove my skills at the same time

# Features
- Adding links with custom titles and custom categories.
- Starring/Bookmarking links — for links you consider really important or you refer to a lot.
- Viewing links by categories.
- Share links to other apps/contacts or copy to clipboard.
- Search through links by title or url.
- Delete link(s).
- Light/Dark Theme.
- Exporting your data (links) into a csv file to dowmload locally.

# Technologies Used
- [Next js](https://nextjs.org/) : Fullstack framework.
- [Next-auth](https://next-auth.js.org/) : Authentication.
- [React Query](https://react-query-v3.tanstack.com/) : Async state management.
- [Mongo DB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) : Database, Database querying and connection with Mongoose.
- TypeScript.
- CSS

## Features I may add later
- Backing up data in google drive and retrieving later.

## Run locally
```
git clone https://github.com/Phyf3/savelink.git
cd savelink

yarn install
yarn run dev
```
