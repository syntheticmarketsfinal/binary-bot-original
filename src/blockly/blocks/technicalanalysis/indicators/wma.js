// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3qghes
import {
    translate
} from '../../../../i18n';
import {
    expectValue
} from '../../shared';
import theme from '../../../theme';
import config from '../../../../botPage/common/const';

Blockly.Blocks.wma = {
    init: function init() {
        this.appendDummyInput().appendField(translate('Weighted Moving Average (WMA)')).appendField(new Blockly.FieldDropdown(config.returnList), 'RETURNWMA');
        this.appendValueInput('INPUT').setCheck('Array').setAlign(Blockly.ALIGN_RIGHT).appendField(`${translate('Input List')  }:`);
        this.appendValueInput('PERIOD').setCheck('Number').setAlign(Blockly.ALIGN_RIGHT).appendField(`${translate('Period')  }:`);
        this.setOutput(true, this.getFieldValue('RETURNWMA') === 'latest' ? 'Number' : 'Array');
        this.setColour(theme.subBlockColor);
        this.setTooltip(translate('Calculates Weighted Moving Average (WMA) from a list with a period'));
        if (this.isInFlyout) {
            this.setInputsInline(true);
        } else {
            this.setInputsInline(false);
        }
    },
    onchange: function onchange() {
        this.childBlocks_.map(a => {
            a.svgPath_.style.fill = theme.indicatorsColor;
            a.svgPathDark_.style.display = 'none';
        })
        for (let index = 0; index < this.svgGroup_.children.length; index++) {
            const a = this.svgGroup_.children[index];
            if (a.tagName === 'g' && (a.classList.length === 0)) {
                a.children[3].children[0].style.fill = theme.subBlockColor;
            } else if (a.tagName === 'g' && a.classList[0] === 'blocklyEditableText') {
                a.children[0].style.fill = theme.underBlockColor;
            } else if (a.tagName === 'g' && a.classList[0] === 'blocklyDraggable') {
                a.children[1].style.fill = theme.subBlockColor;
            }
        }
        this.setOutput(true, this.getFieldValue('RETURNWMA') === 'latest' ? 'Number' : 'Array');
    },
};

Blockly.JavaScript.wma = block => {
    const values = expectValue(block, 'INPUT');
    const period = Blockly.JavaScript.valueToCode(block, 'PERIOD', Blockly.JavaScript.ORDER_ATOMIC) || '10';
    const returnType = block.getFieldValue('RETURNWMA');
    return [`Bot.wma({values:${values}, period:${period}}, '${returnType}')`, Blockly.JavaScript.ORDER_NONE];
};



// WEBPACK FOOTER //
// ./src/botPage/view/blockly/blocks/technicalanalysis/indicators/wma.js