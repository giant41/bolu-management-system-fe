<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
            <li class="m-1" v-if="hasPrev()">
                <a class="btn btn-light rounded-circle" href="#" @click.prevent="changePage(prevPage)" aria-label="Previous">
                    <i class="fas fa-angle-left"></i>
                </a>
            </li>
            <li class="m-1" v-if="hasFirst()">
                <a class="btn btn-secondary rounded-fill" href="#" @click.prevent="changePage(1)">1</a>
            </li>
            <li class="m-1" v-if="hasFirst()">...</li>

            <li class="m-1" v-for="page in pages">
                <a class="btn btn-secondary rounded-fill" href="#"  @click.prevent="changePage(page)">{{ page }}</a>
            </li>

            <li class="m-1" v-if="hasLast()">...</li>
            <li class="m-1" v-if="hasLast()">
                <a class="btn btn-secondary rounded-fill" href="#" @click.prevent="changePage(totalPages)">{{ totalPages }}</a>
            </li>

            <li class="m-1" v-if="hasNext()">
                <a class="btn btn-light rounded-circle" href="#" aria-label="Next"  @click.prevent="changePage(nextPage)">
                    <i class="fas fa-angle-right"></i>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'Pagination',
    props: {
        current: {
            type: Number,
            default: 1
        },
        total: {
            type: Number,
            default: 0
        },
        perPage: {
            type: Number,
            default: 5
        },
        pageRange: {
            type: Number,
            default: 2
        },
    },
    data() {
        return {
        input: '',
        }
    },
    methods: {
        hasFirst: function () {
            return this.rangeStart !== 1
        },
        hasLast: function () {
            return this.rangeEnd < this.totalPages
        },
        hasPrev: function () {
            return this.current > 1
        },
        hasNext: function () {
            return this.current < this.totalPages
        },
        changePage: function (page) {
            if (page > 0 && page <= this.totalPages) {
                this.$emit('page-changed', page)
            }
        }
    },
    computed: {
        pages: function () {
            var pages = []
            for (var i = this.rangeStart; i <= this.rangeEnd; i++) {
                pages.push(i)
            }
            return pages
        },
        rangeStart: function () {
            var start = this.current - this.pageRange
            return (start > 0) ? start : 1
        },
        rangeEnd: function () {
            var end = this.current + this.pageRange
            return (end < this.totalPages) ? end : this.totalPages
        },
        totalPages: function () {
            return Math.ceil(this.total / this.perPage)
        },
        nextPage: function () {
            return this.current + 1
        },
        prevPage: function () {
            return this.current - 1
        }
    }
})
</script>
