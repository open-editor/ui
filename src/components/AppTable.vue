<template>
    <div class="header flex items-stretch my-2.5" v-bind="$attrs">
        <div class="cellName px-2.5 py-1.5 text-center rounded-s-lg border border-gray-300 w-[5%]">
            {{ tHead[colActive].name }}{{ rowActive + 1 }}
        </div>
        <div class="input rounded-e-lg w-full">
            <input
                    type="text"
                    class="rounded-e-lg border border-gray-300 px-2.5 py-1.5 text-base focus:shadow-none h-full w-full"
                    :value="arrCells[rowActive][colActive].mathExp ? arrCells[rowActive][colActive].mathExp : arrCells[rowActive][colActive].content"
                    @input="changeInput"
                    @keyup.enter="onNextCell(arrCells[rowActive][colActive])"
            />
        </div>
    </div>
    <div class="table-wrapper select-none border border-gray-300 h-[calc(100vh-128px)] overflow-scroll pb-10">
        <table class="table w-max border-collapse cursor-cell">
            <tr>
                <th class="border border-gray-300 text-center h-[30px] w-[100px] max-w-[100px] relative cursor-s-resize"></th>
                <th
                        v-for="(col, i) in cols"
                        :key="i"
                        :class="{ 'bg-black/10 border-b-2 border-b-[#008200]': i === colActive }"
                        :style="{width: tHead[i]?.width + 'px', maxWidth: tHead[i]?.width + 'px',}"
                        class="border border-gray-300 text-center h-[30px] w-[100px] max-w-[100px] relative cursor-s-resize font-normal"
                >
                    {{ tHead[i]?.name }}
                    <span class="col-resize w-2 h-full absolute -right-1 z-[2] cursor-col-resize" @mousedown="colResize(i, $event)"></span>
                </th>
            </tr>
            <tr v-for="(row, rowInd) in arrCells" :key="rowInd" ref="refRows">
                <td :class="{ 'bg-black/10 border-r-2 border-r-[#008200]': rowInd === rowActive }" :style="{ height: rowsHeight[rowInd] + 'px' }"
                    class="border border-gray-300 text-center h-[30px] relative cursor-e-resize"
                >
                    {{ rowInd + 1 }}
                    <span class="row-resize w-full h-1 absolute left-0 -bottom-1 z-[2] cursor-row-resize" @mousedown="rowResize(rowInd, $event)"></span>
                </td>
                <td
                        v-for="(col, colInd) in arrCells[rowInd]"
                        :key="colInd"
                        @mousedown="activeCell(col, $event)"
                        @mouseover="isStartOver && onMouseOver(rowInd,colInd)"
                        @mouseup="onMouseUp"
                        @keypress.enter.prevent="onNextCell(col)"
                        @keyup.down.prevent="onNextCell(col)"
                        @keyup.up.prevent="onUpCell(col)"
                        @keyup.left.prevent="onLeftCell(col)"
                        @keyup.right.prevent="onRightCell(col)"
                        class="border border-gray-300 text-center h-[30px] outline-0 relative p-0"
                        :class="{'outline outline-2 outline-[#007e00a5]': col.selected, 'bg-black/10' : isSelected(rowInd,colInd),'outline outline-2 outline-[#008200] bg-inherit': col.active }"
                >
                    <div
                            class="cell-content outline-none w-full h-full"
                            :contenteditable="col.editable && !col.mathExp"
                            @input="inputCell(rowInd,colInd,$event)"
                    >
                        {{ col.content }}
                    </div>
                    <span
                            class="select-cells absolute z-[2] -right-1.5 -bottom-1.5 w-2 h-2 border border-white cursor-crosshair bg-[#008200]"
                            @mousedown="duplicateContent"
                            v-if="rowActive === rowInd && colActive === colInd && !duplicateSelection"
                    ></span>
                    <span class="duplicate-selection absolute z-[2] -right-1.5 -bottom-1.5 w-2 h-2 border border-white cursor-crosshair bg-black"
                          v-if="duplicateSelection && rowInd === bottomRightCell[0] && colInd === bottomRightCell[1]"
                          @mousedown="duplicateSelectCells"
                          @mouseup="duplicateSelectMove = false"
                    ></span>
                </td>
            </tr>
        </table>
        <div class="absolute h-10 bottom-0 bg-gray-100 shadow-inner w-[100vw] flex items-center z-[3] overflow-x-scroll">
            <div class="my-1 mx-4 text-2xl cursor-pointer" @click="addSheet">+</div>
            <div v-for="(sheet,i) in curTable!.sheets" :key="i" :class="{'border border-primary-600':i===curSheet}"
                 class="sheet-div px-2 py-1 bg-transparent cursor-pointer rounded-lg relative mr-3 group" @click="switchSheet(i)"
            >
                {{sheet.name}}
            <button v-if="curTable && curTable.sheets.length>1" @click="deleteFunction(i)" type="button" class="crest absolute -top-1 -right-2 bg-white px-1 shadow-md z-[10] rounded-full text-xs opacity-0 group-hover:opacity-100 ease-in-out duration-100">✕</button>
            </div>
        </div>
    </div>
    <DeleteModal
      v-if="isModalVisible"
      :name-for-delete="nameForDelete"
      @removeSheet="removeSheet(removeItem)"
      @cancel="hideDeleteModal"
    />
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, ref } from "vue";
import type { Ref } from "vue";
import tableData from '@/data'
import {useRoute} from "vue-router";
import DeleteModal from "@/components/Modal/DeleteModal.vue";
import { initFlowbite } from "flowbite";
import { format } from "timeago.js";

const route = useRoute();

const props = defineProps({
    cols: {type: Number, default: 30},
    rows: {type: Number, default: 30}
})

interface Cell {
    content: string,
    active: boolean,
    selected: boolean,
    editable: boolean,
    selectCell: boolean,
    width: number,
    row: number,
    col: number,
    mathExp: string,
}

interface Selection {
    startRow: number | null,
    startCol: number | null,
    endRow: number | null,
    endCol: number | null,
}

const arrCells = ref<Cell[][]>([]),
    tHead = ref<{ name: string, width: number }[]>([]),
    rowsHeight = ref<number[]>([]),
    colActive = ref<number>(0),
    rowActive = ref<number>(0);

const refRows = ref([]);

let isStartOver = ref<boolean>(false);
let bottomRightCell: number[] = [0, 0];

const selection = reactive<Selection>({
    startRow: 0,
    startCol: 0,
    endRow: 0,
    endCol: 0,
});

let startRow: number, startCol: number, endRow: number, endCol: number;
const defaultSelectValue = () => {
    selection.startRow = null;
    selection.startCol = null;
    selection.endRow = null;
    selection.endCol = null;
}
const curTable = tableData.value.find(table => table.id === +route.params.id);
let curSheet = ref(0);
const onCreated = () => {
    const currentTable = tableData.value.find(table => table.id === +route.params.id);
    let arrCellsBody:string[][] = []
    for (let i = 0; i < props.rows; i++) {
        arrCells.value.push([]);
        arrCellsBody.push([]);
        rowsHeight.value.push(30);
        for (let j = 0; j < props.cols; j++) {
            arrCells.value[i].push({
                content: "",
                active: false,
                selected: false,
                editable: false,
                selectCell: false,
                width: 100,
                row: i,
                col: j,
                mathExp: ""
            });
            arrCells.value[i][j].content = currentTable?.sheets?.[0].cellContent?.[i]?.[j] ?? ""
            arrCellsBody[i][j] = arrCells.value[i][j].content
        }
    }
    currentTable!.sheets[curSheet.value].cellContent = arrCellsBody
    arrCells.value[0][0].active = true;
    arrCells.value[0][0].editable = true;
    const focusOnCell = async () => {
        await nextTick();
        (refRows.value[0] as any).children[1].firstChild.focus();
    };
    focusOnCell();

    currentTable!.lastOpened = format(new Date())
}
onCreated()

const letterArr: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const tableHeaderTitle = () => {
    for (let i = 0; i < props.cols; i++) {
        if (i < 26) {
            tHead.value.push({name: letterArr[i], width: 100});
        } else {
            const colLetter = letterArr[Math.floor(i / 26) - 1] + letterArr[i % 26];
            tHead.value.push({name: colLetter, width: 100});
        }
    }
    return tHead.value;
}
tableHeaderTitle();

const duplicateSelection = computed(() => {
    return !(selection.startRow === selection.endRow && selection.startCol === selection.endCol);
    // return rowActive.value !=== selection.endRow || colActive.value !=== selection.endCol
});

const activeCell = (cell: Cell, e: Event) => {
    let cellActive;
    for (let i = 0; i < arrCells.value.length; i++) {
        cellActive = arrCells.value[i].find((el) => el.active === true);
        if (cellActive) {
            cellActive.active = false;
            cellActive.editable = false;
            break;
        }
    }
    colActive.value = cell.col;
    rowActive.value = cell.row;
    cell.active = true;
    cell.editable = true;

    selection.startRow = cell.row;
    selection.endRow = cell.row;
    selection.startCol = cell.col;
    selection.endCol = cell.col;
    isStartOver.value = true;
    bottomRightCell = [cell.row, cell.col]
    const focusOnCell = async () => {
        await nextTick();
        (e.target as HTMLElement).focus();
    };
    focusOnCell()
    parseExpression(cell)

}
const inputCell = (rowI:number,colI:number,e:Event) => {

    arrCells.value[rowI][colI].content = (e.target as HTMLElement).textContent ?? '';
    curTable!.sheets[curSheet.value].cellContent[rowI][colI] = arrCells.value[rowI][colI].content;
}

let sheetsCounter = curTable!.sheets.length;
const addSheet = async () => {
    sheetsCounter++;
    curTable!.sheets.push({name:`Sheet${sheetsCounter}`,cellContent:[[]]})

    await nextTick();
    initFlowbite()
}
const switchSheet = (i:number) => {
    curSheet.value = i;
    let arrCellsBody:string[][] = []
    for (let r = 0; r < props.rows; r++) {
        arrCellsBody.push([]);
        for (let c = 0; c < props.cols; c++) {
            arrCells.value[r][c].content = curTable!.sheets[i]?.cellContent?.[r]?.[c] ?? ""
            if (curTable!.sheets[i]?.cellContent?.[r]?.[c]?.[0] === "="){
                parseExpression(arrCells.value[r][c])
            }
            arrCellsBody[r][c] = arrCells.value[r][c].content
        }
    }
    curTable!.sheets[curSheet.value].cellContent = arrCellsBody
}

const removeItem: Ref<number> = ref(0)


const isModalVisible = ref(false);
const idForDelete = ref();
const nameForDelete = ref();
function deleteFunction(i: number) {
    removeItem.value = i;
    isModalVisible.value = true;
    idForDelete.value = i;
    nameForDelete.value = curTable!.sheets[i].name
}
const removeSheet = (i:number) => {
    let temp = curSheet.value;
    curTable!.sheets.splice(i,1)
    temp !== i ? temp < i ? switchSheet(temp) : switchSheet(temp - 1) : switchSheet(0)
    isModalVisible.value = false
}
function hideDeleteModal() {
    isModalVisible.value = false;
}

const parseExpression = (cell: Cell) => {
    function parse(str: string) {
        try {
            return Function(`'use strict'; return (${str})`)()
        } catch (e) {
            return NaN;
        }
    }

    let mathExpression = cell.content;

    if (mathExpression[0] === "=") {
        cell.mathExp = mathExpression;
        mathExpression = mathExpression.slice(1);
        cell.content = parse(mathExpression);
    }
}
const changeInput = (event: Event) => {
    const input = event.target as HTMLInputElement
    arrCells.value[rowActive.value][colActive.value].content = input!.value
    if (input.value[0] === "=") {
        arrCells.value[rowActive.value][colActive.value].mathExp = input!.value
    } else {
        arrCells.value[rowActive.value][colActive.value].mathExp = ""
    }
}
const onNextCell = (cell: Cell) => {
    if (rowActive.value + 1 < props.rows) {
        cell.active = false;
        cell.editable = false;
        rowActive.value += 1;
        arrCells.value[rowActive.value][colActive.value].active = true;
        arrCells.value[rowActive.value][colActive.value].editable = true;
        const focusOnCell = async () => {
            await nextTick();
            (refRows.value[rowActive.value] as any).children[colActive.value + 1].firstChild.focus();
        };
        focusOnCell()
        defaultSelectValue();
    }
    parseExpression(cell);
}
const onKeypress = (cell: Cell) => {
    cell.active = false;
    cell.editable = false;
    arrCells.value[rowActive.value][colActive.value].active = true;
    arrCells.value[rowActive.value][colActive.value].editable = true;
    const focusOnCell = async () => {
        await nextTick();
        (refRows.value[rowActive.value] as any).children[colActive.value + 1].firstChild.focus();
    };
    focusOnCell();
    defaultSelectValue();
    parseExpression(cell);
}
const onUpCell = (cell: Cell) => {
    if (rowActive.value > 0) {
        rowActive.value -= 1;
        onKeypress(cell);
    }
}
const onLeftCell = (cell: Cell) => {
    if (colActive.value > 0) {
        colActive.value -= 1;
        onKeypress(cell);
    }
}
const onRightCell = (cell: Cell) => {
    if (colActive.value + 1 < props.cols) {
        colActive.value += 1;
        onKeypress(cell);
    }
}
const colResize = (i: number, e: Event) => {
    let target = e.target as HTMLElement;
    let mouseE = e as MouseEvent;

    const col = target.parentElement;
    const colWidth = col!.offsetWidth;
    const colX = mouseE.pageX;
    const mouseMove = (event: Event) => {
        let mouseEvent = event as MouseEvent;

        tHead.value[i].width = colWidth - (colX - mouseEvent.pageX);
    };
    document.addEventListener("mousemove", mouseMove);
    document.onmouseup = function () {
        document.removeEventListener("mousemove", mouseMove);
        col!.onmouseup = null;
    };
    col!.ondragstart = function () {
        return false;
    };
}
const rowResize = (i: number, e: Event) => {
    let target = e.target as HTMLElement;
    let mouseE = e as MouseEvent;

    const row = target.parentElement;
    const rowHeight = row!.offsetHeight;
    const rowY = mouseE.pageY;
    const mouseMove = (event: Event) => {
        let mouseEvent = event as MouseEvent;
        rowsHeight.value[i] = rowHeight - (rowY - mouseEvent.pageY);
    };
    document.addEventListener("mousemove", mouseMove);
    document.onmouseup = function () {
        document.removeEventListener("mousemove", mouseMove);
        row!.onmouseup = null;
    };
    row!.ondragstart = function () {
        return false;
    };
};
const duplicateContent = (e: Event) => {
    e.stopPropagation();
    let mouseE = e as MouseEvent;

    let startSelectedX = mouseE.pageX;
    let startSelectedY = mouseE.pageY;
    const mouseMove = (event: Event) => {
        isStartOver.value = false

        let mouseEvent = event as MouseEvent;

        let selectedCellsX = mouseEvent.pageX - startSelectedX;
        let selectedCellsY = mouseEvent.pageY - startSelectedY;
        let absSelectedCellsX = Math.abs(selectedCellsX);
        let absSelectedCellsY = Math.abs(selectedCellsY);
        let i = 1;
        const checkSelectedCells = () => {

            if (absSelectedCellsX >= absSelectedCellsY) {
                // Make the default value
                arrCells.value.forEach((row) => {
                    if (row[colActive.value].selected) {
                        row[colActive.value].selected = false;
                    }
                });

                if (colActive.value + i < props.cols && colActive.value + i > 0) {
                    if (selectedCellsX < 0) {
                        if (Math.abs(selectedCellsX) - tHead.value[colActive.value + i - 1].width > 0) {
                            arrCells.value[rowActive.value][colActive.value + i - 1].selected = true;
                            selectedCellsX += tHead.value[colActive.value + i - 1].width;
                            i--;
                            checkSelectedCells();
                        } else {

                            arrCells.value[rowActive.value][colActive.value + i - 1].selected = false;
                            selectedCellsX -= tHead.value[colActive.value + i - 1].width;
                            i++;
                        }
                    } else if (selectedCellsX - tHead.value[colActive.value + i].width > 0) {
                        arrCells.value[rowActive.value][colActive.value + i].selected = true;
                        selectedCellsX -= tHead.value[colActive.value + i].width;
                        i++;
                        checkSelectedCells();
                    } else {
                        arrCells.value[rowActive.value][colActive.value + i].selected = false;
                        selectedCellsX += tHead.value[colActive.value + i].width;
                        i--;
                    }
                }
            } else {
                arrCells.value[rowActive.value].find((cell) => {
                    cell.selected = false;
                });
                if (rowActive.value + i < props.rows && rowActive.value + i > 0) {
                    if (selectedCellsY < 0) {
                        if (Math.abs(selectedCellsY) > rowsHeight.value[rowActive.value + i - 1]) {
                            arrCells.value[rowActive.value + i - 1][colActive.value].selected = true;
                            selectedCellsY += rowsHeight.value[rowActive.value + i - 1];
                            i--;
                            checkSelectedCells();
                        } else {
                            arrCells.value[rowActive.value + i - 1][colActive.value].selected = false;
                            selectedCellsY -= rowsHeight.value[rowActive.value + i - 1];
                            i++;
                        }
                    } else {
                        if (selectedCellsY > rowsHeight.value[rowActive.value + i]) {
                            arrCells.value[rowActive.value + i][colActive.value].selected = true;
                            selectedCellsY -= rowsHeight.value[rowActive.value + i];
                            i++;
                            checkSelectedCells();
                        } else {
                            arrCells.value[rowActive.value + i][colActive.value].selected = false;
                            selectedCellsY += rowsHeight.value[rowActive.value + i];
                            i--;
                        }
                    }
                }
            }
        };
        checkSelectedCells();
    };

    document.addEventListener("mousemove", mouseMove);
    document.onmouseup = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.onmouseup = null;
        arrCells.value[rowActive.value].find((cell) => {
            if (cell.selected) {
                cell.content =
                    arrCells.value[rowActive.value][colActive.value].content;
                cell.selected = false;
            }
        });
        arrCells.value.forEach((row) => {
            if (row[colActive.value].selected) {
                row[colActive.value].content =
                    arrCells.value[rowActive.value][colActive.value].content;
                row[colActive.value].selected = false;
            }
        });
    };

};
const onMouseOver = (rowInd: number, colInd: number) => {
    if (selection.startRow === null || selection.startCol === null) {
        return
    }
    selection.endRow = rowInd;
    selection.endCol = colInd;
    bottomRightCell = [rowInd, colInd];
    if (selection.endCol < selection.startCol) {
        bottomRightCell[1] = selection.startCol
    }
    if (selection.endRow < selection.startRow) {
        bottomRightCell[0] = selection.startRow
    }
}
let selectedCellsValue: string[][] = [];
const onMouseUp = () => {
    isStartOver.value = false;
    selectedCellsValue = [];
    let iteration = 0;
    for (let row = startRow; row <= endRow; row++) {
        selectedCellsValue[iteration] = [];
        for (let col = startCol; col <= endCol; col++) {
            selectedCellsValue[iteration].push(arrCells.value[row][col].content)
        }
        iteration++;
    }
}
const isSelected = (rowInd: number, colInd: number) => {
    if (selection.startRow === null || selection.endRow === null ||
        selection.startCol === null || selection.endCol === null) {
        return false;
    }
    startRow = Math.min(selection.startRow, selection.endRow);
    endRow = Math.max(selection.startRow, selection.endRow);
    startCol = Math.min(selection.startCol, selection.endCol);
    endCol = Math.max(selection.startCol, selection.endCol);
    return (
        rowInd >= startRow &&
        rowInd <= endRow &&
        colInd >= startCol &&
        colInd <= endCol
    );
}

let duplicateSelectMove = false;

const duplicateSelectCells = (e: Event) => {
    e.stopPropagation();
    duplicateSelectMove = true;

    let mouseE = e as MouseEvent;
    let startSelectedX = mouseE.pageX;
    let startSelectedY = mouseE.pageY;
    const mouseMove = (event: Event) => {
        isStartOver.value = false

        let mouseEvent = event as MouseEvent;
        let selectedCellsX = mouseEvent.pageX - startSelectedX;
        let selectedCellsY = mouseEvent.pageY - startSelectedY;
        let absSelectedCellsX = Math.abs(selectedCellsX);
        let absSelectedCellsY = Math.abs(selectedCellsY);
        let i = 1;

        const checkSelectedCells = () => {
            // Cursor horizontal movement
            if (absSelectedCellsX >= absSelectedCellsY) {
                arrCells.value.forEach((row) => {
                    for (let col = startCol; col <= endCol; col++) {
                        if (row[col].selected) {
                            row[col].selected = false;
                        }
                    }
                });
                // If move to the right
                if (bottomRightCell[1] + i < props.cols && bottomRightCell[1] + i > 0) {

                    if (selectedCellsX > 0) {
                        if (selectedCellsX - tHead.value[bottomRightCell[1] + i].width > 0) {
                            for (let row = startRow; row <= endRow; row++) {
                                arrCells.value[row][bottomRightCell[1] + i].selected = true;
                            }
                            selectedCellsX -= tHead.value[bottomRightCell[1] + i].width;
                            i++;
                            checkSelectedCells();
                        } else {
                            for (let row = startRow; row <= endRow; row++) {
                                arrCells.value[row][bottomRightCell[1] + i].selected = false;
                            }
                            selectedCellsX += tHead.value[bottomRightCell[1] + i].width;
                            i--;
                        }
                    } // If move to the left
                    else {
                        if (Math.abs(selectedCellsX) - tHead.value[bottomRightCell[1] + i - 1].width > 0) {
                            for (let row = startRow; row <= endRow; row++) {
                                arrCells.value[row][bottomRightCell[1] + i - 1].selected = true;
                            }
                            selectedCellsX += tHead.value[bottomRightCell[1] + i].width;
                            i--;
                            checkSelectedCells();
                        } else {
                            for (let row = startRow; row <= endRow; row++) {
                                arrCells.value[row][bottomRightCell[1] + i - 1].selected = false;
                            }
                            selectedCellsX -= tHead.value[bottomRightCell[1] + i].width;
                            i++;
                        }
                    }
                }
                // Cursor vertical movement
            } else {
                for (let row = startRow; row <= endRow; row++) {
                    arrCells.value[row].find((cell) => {
                        cell.selected = false;
                    })
                }
                if (bottomRightCell[0] + i < props.rows && bottomRightCell[0] + i > 0) {
                    // If move to the up
                    if (selectedCellsY < 0) {
                        if (Math.abs(selectedCellsY) > rowsHeight.value[bottomRightCell[0] + i - 1]) {
                            for (let col = startCol; col <= endCol; col++) {
                                arrCells.value[bottomRightCell[0] + i - 1][col].selected = true;
                            }
                            selectedCellsY += rowsHeight.value[bottomRightCell[0] + i - 1];
                            i--;
                            checkSelectedCells();
                        } else {
                            for (let col = startCol; col <= endCol; col++) {
                                arrCells.value[bottomRightCell[0] + i - 1][col].selected = false;
                            }
                            selectedCellsY -= rowsHeight.value[bottomRightCell[0] + i - 1];
                            i++;
                        }
                        // If move to the down
                    } else {
                        if (selectedCellsY > rowsHeight.value[bottomRightCell[0] + i]) {
                            for (let col = startCol; col <= endCol; col++) {
                                arrCells.value[bottomRightCell[0] + i][col].selected = true;
                            }
                            selectedCellsY -= rowsHeight.value[bottomRightCell[0] + i];
                            i++;
                            checkSelectedCells();
                        } else {
                            for (let col = startCol; col <= endCol; col++) {
                                arrCells.value[bottomRightCell[0] + i][col].selected = false;
                            }
                            selectedCellsY += rowsHeight.value[bottomRightCell[0] + i];
                            i--;
                        }
                    }

                }
            }
        }
        checkSelectedCells();
    }
    document.addEventListener("mousemove", mouseMove);
    document.onmouseup = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.onmouseup = null;
        let r = 0;
        let col = 0;
        let isStartDuplicate = false;

        let lastValue: number, step: number;
        let isDate:boolean = false;
        let isLetter:boolean = false;
        let dates:Date[] = [];

        if (endCol - startCol <= 1 && endRow - startRow <= 1) {
            let valuesSequence: string[] = [];
            selectedCellsValue.forEach(i => {
                i.forEach(j => {
                    valuesSequence.push(j);
                })
            })
            lastValue = Number(valuesSequence[1])
            step = lastValue - Number(valuesSequence[0]);

            isLetter = valuesSequence[0].toUpperCase() === 'A' && valuesSequence[1].toUpperCase() === 'B'
            if (isLetter) {
                step = 1;
                lastValue = 1;
            }
            for (const i of valuesSequence) {
                const [day,month,year] = i.split('.');
                if (+day && +month && +year ){
                    isDate = true
                    dates.push(new Date(+year,+month-1,+day))
                } else {
                    isDate = false;
                    break
                }
            }
            if (isDate){
                step = dates[1].getTime() - dates[0].getTime();
                lastValue = +dates[1];
            }
        }
        arrCells.value.forEach((row, rowIndex) => {
            r = isStartDuplicate ? r + 1 : 0;
            col = 0;
            row.forEach((cell, colIndex) => {
                if (cell.selected) {
                    if (endCol - startCol + 1 <= col) {
                        col = 0
                    }
                    if (endRow - startRow + 1 <= r) {
                        r = 0
                    }
                    cell.content = selectedCellsValue[r][col];
                    col++;
                    cell.selected = false;
                    isStartDuplicate = true;
                    if (lastValue && step && colIndex != endCol && colIndex != startCol && startRow === endRow) {
                        if (colIndex > endCol) {
                            cell.content = String(lastValue + step);
                            if (isDate){
                                const fullDate:Date = new Date(lastValue + step)
                                const arrDate:(number|string)[] = [fullDate.getDate(),fullDate.getMonth()+1,fullDate.getFullYear()]
                                arrDate.forEach((i:number|string,index:number) => arrDate[index] = typeof i === 'number' && i < 10 ? i.toString().padStart(2, '0') : i)
                                cell.content =arrDate[0] + "." + arrDate[1] + "." + arrDate[2];
                            }
                            if (isLetter){
                                step++
                                cell.content = step<26? letterArr[step]: letterArr[Math.floor(step / 26) - 1] + letterArr[step % 26];
                            }
                            lastValue += step;
                        } else {
                            cell.content = String(lastValue - step * (startCol - colIndex + 1));
                            if (isDate){
                                const fullDate:Date = new Date(lastValue - step * (startCol - colIndex + 1))
                                const arrDate:(number|string)[] = [fullDate.getDate(),fullDate.getMonth()+1,fullDate.getFullYear()]
                                arrDate.forEach((i:number|string,index:number) => arrDate[index] = typeof i === 'number' && i < 10 ? i.toString().padStart(2, '0') : i)
                                cell.content =arrDate[0] + "." + arrDate[1] + "." + arrDate[2];
                            }
                        }
                    } else if (lastValue && step && rowIndex != endRow && rowIndex != startRow && startCol === endCol) {
                        if (rowIndex > endRow) {
                            cell.content = String(lastValue + step);
                            if (isDate){
                                const fullDate:Date = new Date(lastValue + step)
                                const arrDate:(number|string)[] = [fullDate.getDate(),fullDate.getMonth()+1,fullDate.getFullYear()]
                                arrDate.forEach((i:number|string,index:number) => arrDate[index] = typeof i === 'number' && i < 10 ? i.toString().padStart(2, '0') : i)
                                cell.content =arrDate[0] + "." + arrDate[1] + "." + arrDate[2];
                            }
                            lastValue += step;
                        } else {
                            cell.content = String(lastValue - step * (startRow - rowIndex + 1));
                            if (isDate){
                                const fullDate:Date = new Date(lastValue - step * (startRow - rowIndex + 1))
                                const arrDate:(number|string)[] = [fullDate.getDate(),fullDate.getMonth()+1,fullDate.getFullYear()]
                                arrDate.forEach((i:number|string,index:number) => arrDate[index] = typeof i === 'number' && i < 10 ? i.toString().padStart(2, '0') : i)
                                cell.content =arrDate[0] + "." + arrDate[1] + "." + arrDate[2];
                            }
                        }
                    }
                }
            });

        });

    };
}

</script>