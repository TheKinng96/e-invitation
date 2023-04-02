serve:
	npm run dev

type:
	npx pocketbase-typegen --db /Users/gen/Downloads/pocketbase/pb_data/data.db --out ./src/_types/pocketbase-types.ts 

deploy:
	npx gh-pages -d dist