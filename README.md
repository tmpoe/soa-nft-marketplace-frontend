# Frontend of my Nft Marketplace petproject

Simple implementation of a Nft Marketplace

I strived for full overview of the techstack so forgive me if there are some questionable things in here. It does what is needs to sufficiently which is enough for the original intention. Have fun with it! :)

## How to

### Dev

```
yarn install

yarn dev
```

If you want to mint:

```
set NEXT_PUBLIC_BACKEND_URL to an url with port 5000 pointing to the server of https://github.com/tmpoe/soa-nft-marketplace-backend

Read its how to on how to start it
```

Update graph version if necessary in .graphclientrc.yml (endpoint) then
```
yarn buildGraph
```

Docker
```
yarn buildImage

yarn docker
```

MAKE SURE YOU HAVE THE LATEST CONTRACT ADDRESSES IMPORTED FROM BACKEND

### Local prod

```
yarn install --prod

yarn prod
```

### Online prod - gcloud
```
set NEXT_PUBLIC_BACKEND_URL to running VM instance url

yarn buildImage

push to gcloud

fire up VM instance
```