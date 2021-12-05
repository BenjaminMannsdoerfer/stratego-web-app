let matchFieldSize = 10;

const app = Vue.createApp({})
    app.component('gameboard', {
    template:`
        <div id="board">
            <table id='tbl' class='matchfield'>
                <tr v-for="r in rows">
                    <td class="char-pic field" v-for="c in cols" v-bind:id="'row' + r + 'col' + c">
                        <input type="image" v-bind:class="'row' + r + 'col' + c + ' fig-cards'" alt="" src="" />
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
