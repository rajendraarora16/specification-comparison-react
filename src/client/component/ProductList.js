import React from 'react'

export default class ProductList extends React.Component {

    render(){ 
        /**
         * Merged both ajax call response into one array and getting the response to list in table.
         */
        const allKeys = this.props._arrGlobal.reduce((keys, obj) => {
            Object.keys(obj).forEach(key => keys.add(key))
            return keys;
          }, new Set());
          const merged = this.props._arrGlobal.reduce((merged, obj) => {
            allKeys.forEach((key) => {
              if (!merged[key]) merged[key] = [];
              merged[key].push(obj[key] || '-');
            });
            return merged;
          }, {});
        
        /**
         * Appended products name
         */
        let i = 0;
        for (var k in merged){
            if (merged.hasOwnProperty(k)) {
            i++;
            $(".table table").append("<tr class='b-table_row table_tr_p_"+i+"'><td class='table_td_p'><strong>"+k+"</strong></td></tr>");
            }
        }

        /**
         * Appended item - 1 list and
         */
        let j=0;
        for (var k in merged){
            if (merged.hasOwnProperty(k)) {
            j++;
            $(".table_tr_p_"+j+"").append("<td>"+merged[k][0]+"</td>");
            $(".table_tr_p_"+j+"").append("<td>"+merged[k][1]+"</td>");
            }
        }

        return (
            <div className="table b-table j-spec-table">
                <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Item 1</th>
                        <th>Item 2</th>
                    </tr>
                </thead>
                </table>
            </div>
        );
    }
}
