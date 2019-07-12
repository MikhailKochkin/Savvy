import React, { Component } from 'react';
import Link from 'next/link';

class Teach extends Component {
    render() {
        return (
            <div>
                <p>Добро пожаловать на страницу преподавателя</p>
                <p>Если ваше учебное заведение еще не зарегистрировано 
                    в нашей системе, отправьте заявку по этой схеме.</p>
                <button>Отправить заявку</button>
                <p>Если ваше учебное заведение еще  зарегистрировано 
                    в нашей системе, вы можете создавать курсы по этой ссылке.</p>
               
                  <Link 
                    prefetch 
                    href="/create">
                    <button><a>Создать курс</a></button>
                  </Link>
                <p>Курсы, которые вы ведете:</p>
                
            </div>
        );
    }
}

export default Teach;