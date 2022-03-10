# API Doc <img src="https://d33wubrfki0l68.cloudfront.net/e937e774cbbe23635999615ad5d7732decad182a/26072/logo-small.ede75a6b.svg"  align="right"  height="50px"  />
## Routes
### __GET__`/investment` - list all investments:
```
{
	"statusCode": 200,
	"message": [
		"Fetch successfully completed"
	],
	"data": [
		{
			"id": 1,
			"owner": "investidor@coderockr.com",
			"initial_amount": 10000,
			"withdraw_amount": null,
			"withdraw_date": null,
			"creation_date": "2021-12-09T23:54:18.250Z"
		}
	],
	"error": null
}
``` 
---
### __GET__`/investment/:id` - Details one Investment
```
{
	"statusCode": 200,
	"message": [
		"Fetch successfully completed"
	],
	"data": {
		"id": 1,
		"owner": "investidor@coderockr.com",
		"initial_amount": 10000,
		"withdraw_amount": null,
		"withdraw_date": null,
		"creation_date": "2021-12-09T23:54:18.250Z",
		"expectedAmount": 12095.60
	},
	"error": null
}
```
---
### __GET__`/investment/owner/:email`- list all investments of one owner (with pagination)
```
{
	"statusCode": 200,
	"message": [
		"Fetch successfully completed"
	],
	"data": {
		"items": [
			{
				"id": 1,
				"owner": "investidor@coderockr.com",
				"initial_amount": 10000,
				"withdraw_amount": null,
				"withdraw_date": null,
				"creation_date": "2021-12-09T23:54:18.250Z",
				"expectedAmount": 12095.60
			},
		],
		"meta": {
			"totalItems": 4,
			"itemCount": 4,
			"itemsPerPage": 10,
			"totalPages": 1,
			"currentPage": 1
		}
	},
	"error": null
}
```
---
### __POST__`/investment` - Creates a new Investment
#### reqBody exemple:
```
{
	"owner":"investidor@coderockr.com",
	"initial_amount": 10000,
	"creation_date": "2021-12-09T23:54:18.250Z"
}
```
#### Validations
- `ownner` must be a email
- `inital_amount` must be a number
- `creation_date` is optional (default is today date)

---
### __PATCH__`/investment/:id` - Withdraw a Investment
```
{
	"statusCode": 200,
	"message": [
		"You withdrew $12095.60, Congratulations!"
	],
	"data": {
		"id": 4,
		"owner": "investidor@coderockr.com",
		"initial_amount": 10000,
		"withdraw_amount": 12095.60,
		"withdraw_date": "2022-03-10T00:41:30.603Z",
		"creation_date": "2021-12-09T23:54:18.250Z"
	},
	"error": null
}
```
---