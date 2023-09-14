const app = Vue.createApp({
    data() {
        return {
            mobile: '',
            orderList: [],
        };
    },
    methods: {
        onQuery() {
            if (!this.mobile) {
                vant.showToast('请输入手机号!');
                return;
            }
            this.orderList = [];
            axios
                .post('/api/v1/order/query', { mobile: this.mobile })
                .then((res) => {
                    if (res.data.statusCode === 200) {
                        this.orderList = res.data.data;
                    } else {
                        vant.showToast(res.data.message);
                    }
                })
                .catch((err) => {
                    vant.showToast('网络错误，请稍后再试！');
                });
        },
        formatTime(time) {
            const date = new Date(time);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hour = date.getHours();
            const minute = date.getMinutes();
            const second = date.getSeconds();
            return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        },
        onToPayUrl(url) {
            window.open(url);
        },
    },
});
app.use(vant);
app.use(vant.Lazyload);
app.mount('#app');
