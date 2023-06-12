interface sheetsData {
    id: number,
    name: string,
    ownedBy: string,
    lastOpened: string,
    sheets:[{
        name: string,
        cellContent:string[][]
    }]
}
import type {Ref} from "vue";
import {ref} from "vue";
import { faker } from '@faker-js/faker';
import { format } from 'timeago.js';
const ELEMENTS_COUNT = 500;

const sheetsData: Ref<sheetsData[]> = ref([]);

for (let i = 0; i < ELEMENTS_COUNT; i++) {
    sheetsData.value.push({
        id: i,
        name: `${i + 1}. ${faker.word.words({ count: { min: 5, max: 10 } })}`,
        ownedBy: faker.person.fullName(),
        lastOpened: format(faker.date.past()),
        sheets: [
            {
                name: 'Sheet1',
                cellContent: [
                    [faker.number.int(10000).toString(), faker.string.numeric(2), 'C1'],
                    [faker.number.int(10000).toString(), '', faker.number.int(10000).toString()],
                    ['A3', 'B3', 'C3'],
                    ['A4', faker.string.alpha(5), ''],
                ]
            }
        ],
    })
}


export default sheetsData;
