var my_news = [
    {
        title: 'Саша Печкин',
        text: 'В четчерг, четвертого числа...',
        bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
    },
    {
        title: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'А евро 42!'
    },
    {
        title: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
    }
];

var res;

var Article = React.createClass({
    propTypes: {
        data: React.PropTypes.shape({
            title: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string
        })
    },
    getInitialState: function() {
        return {
            visible: false
        };
    },
    readmoreClick: function(e) {
        e.preventDefault();
        this.setState({visible: true});
    },
    render: function() {
        var author = this.props.data.title,
            text = this.props.data.text,
            bigText = this.props.data.bigText,
            visible = this.state.visible;

        return (
            <div className='article'>
                <p className='news__author'>{author}:</p>
                <p className='news__text'>{text}</p>
                <a href="#"
                   onClick={this.readmoreClick}
                   className={'news__readmore ' + (visible ? 'none': '')}>
                    Подробнее
                </a>
                <p className={'news__big-text ' + (visible ? '': 'none')}>{bigText}</p>
            </div>
        )
    }
});

var News = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    getInitialState: function() {
        return {
            counter: 0
        }
    },
    render: function() {
        var data = this.props.data;
        var newsTemplate;

        if (data.length > 0) {
            newsTemplate = data.map(function(item, index) {
                return (
                    <div key={index}>
                        <Article data={item} />
                    </div>
                )
            })
        } else {
            newsTemplate = <p>К сожалению новостей нет</p>
        }

        return (
            <div className='news'>
                {newsTemplate}
                <strong
                    className={'news__count ' + (data.length > 0 ? '':'none') }>Всего новостей: {data.length}</strong>
            </div>
        );
    }
});

// --- добавили test input ---
var TestInput = React.createClass({
    componentDidMount: function() { //ставим фокус в input
        ReactDOM.findDOMNode(this.refs.myTestInput).focus();
    },

    render: function() {
        return (
            <div>
                <input
                    className='test-input'
                    defaultValue=''
                    placeholder='введите значение'
                    ref='myTestInput'
                    />

            </div>
        );
    }
});
var App = React.createClass({
    getInitialState: function() {
        return {
            data: my_news
        }
    },

    onBtnClickHandler: function() {
        console.log('send server...');
        fetch('http://localhost:3000/articles/show')
            .then((response) => {
                console.log('ans server ', response)
                return response.json()
            })
            .then((data) => {
                this.setState({data: data.data});
            })
            .catch((response) => {
                console.log('error server', response)
            });
    },
    render: function() {
        return (
            <div className='app'>
                <h3>Новости</h3>
                <button onClick={this.onBtnClickHandler} ref='alert_button'>Показать alert</button>
                <TestInput /> {/* добавили вывод компонента */}

                <News data={this.state.data} />
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);