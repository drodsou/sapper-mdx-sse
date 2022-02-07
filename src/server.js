import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.get('/countdown', function(req, res) {
		res.writeHead(200, {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive'
		})
		countdown(res, 10)
	})

	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)

	.listen(PORT, err => {
		if (err) console.log('error', err);
	});


	/// ------
	
	function countdown(res, count) {
		res.write("data: " + count + "\n\n")
		if (count)
			setTimeout(() => countdown(res, count-1), 1000)
		else
			res.end()
	}