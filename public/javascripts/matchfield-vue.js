let matchFieldSize = 10;
const app = Vue.createApp({})
    app.component('gameboard', {
    template:`
        <div id="board">
            <table id='tbl' class='matchfield'>
                <tr v-for="r in rows">
                    <td class="char-pic field" v-for="c in cols" v-bind:id="'row' + r + 'col' + c">
                        <span>
                            <input type="image" v-bind:class="'fig-cards ' + 'row' + r + 'col' + c" id="cards" alt="" src="" />
                        </span>
                    </td>
                </tr>
            </table>
        </div>
    `,
    data: function () {
        return {
            cols: Array.from(Array(matchFieldSize).keys()),
            rows: Array.from(Array(matchFieldSize).keys()),
        }
    },
});
app.mount('#gamefield')
