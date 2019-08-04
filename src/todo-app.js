import { LitElement, html, css } from 'lit-element';

import './todo-item.js';

class TodoApp extends LitElement {
    static get properties() {
        return {
            todos: { type: Array }
        }
    }

    constructor() {
        super();
        this.todos = [];
    }

    firstUpdated() {
        this.$input = this.shadowRoot.querySelector('input');
    }

    _removeTodo(e) {
        this.todos = this.todos.filter((todo, index) => {
            return index !== e.detail;
        });
    }

    _toggleTodo(e) {
        this.todos = this.todos.map((todo, index) => {
            return index === e.detail ? {...todo, checked: !todo.checked} : todo;
        });
    }

    _addTodo(e) {
        e.preventDefault();
        if(this.$input.value.length > 0) {
            this.todos = [...this.todos, { text: this.$input.value, checked: false }];
            this.$input.value = '';
        }
    }

    static get styles() {
      return css`
         :host {
             display: block;
             font-family: sans-serif;
             text-align: center;
         }
         button {
             border: none;
             cursor: pointer;
         }
         ul {
             list-style: none;
             padding: 0;
         }
          `;
    }

    render() {
        return html`
            <h1>To do</h1>
            <form id="todo-input">
                <input type="text" placeholder="Add a new to do"></input>
                <button @click=${this._addTodo}>✅</button>
            </form>
            <ul id="todos">
                ${this.todos.map((todo, index) => html`
                    <todo-item 
                        ?checked=${todo.checked}
                        .index=${index}
                        text=${todo.text}
                        @onRemove=${this._removeTodo}
                        @onToggle=${this._toggleTodo}>    
                    </todo-item>`
                )}
            </ul>
        `;
    }
}

window.customElements.define('todo-app', TodoApp);