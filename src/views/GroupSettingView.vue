<template>
    <div class="container">
        <div class="container-content">
            <div class="container-content-1">
                <div class="header-content-1">
                    <router-link :to="`/community/group/detail/` + groupId">{{ groupId }}</router-link>
                    <i class="fa-solid fa-greater-than"></i>
                    <p>Setting</p>
                </div>
                <div class="my-membership">

                </div>
            </div>
            <div class="container-content-2">
                <div class="group-name-content">
                    <img src="https://images.gr-assets.com/groups/1479936067p2/179584.jpg" alt="">
                    <p>{{ groupId }}</p>
                </div>
                <div class="navigation-content">
                    <router-link :to="'/community/group/detail/' + groupId">Group Home</router-link>
                    <router-link :to="'/community/group/bookshelf/' + groupId">Bookshelf</router-link>
                    <router-link :to="'/community/group/discussion/' + groupId">Discussion</router-link>
                    <router-link to="/">Members</router-link>
                    <router-link to="/">Send invite</router-link>
                    <router-link to="/">Setting</router-link>
                </div>
                <div class="leave-group">
                    <h4>Leave Group</h4>
                    <span>You’ve been a member of this group since April 21, 2024 and have made 0 comments.</span>
                    <p>Leave this group.</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        groupId: {type: String, default: ""}
    }
}
</script>
<style scoped>
    a{
        color: #00635d;
    }
    a:hover{
        text-decoration: underline;
    }
    .container{
        margin: 20px 100px;
    }
    .container-content{
        display: flex;
        justify-content: space-between;
    }
    .container-content-1{
        width: 750px;
    }
    .header-content-1{
        display: flex;
        align-items: center;
    }
    .header-content-1 > a{
        font-size: 20px;
        font-weight: bold;
    }
    .header-content-1 > i {
        font-size: 14px;
        margin: 0 5px;
    }
    .header-content-1 > p {
        font-size: 20px;
        font-weight: bold;
    }
    .container-content-2{
        width: 300px;
    }
    .group-name-content{
        display: flex;
        align-items: center;
        margin: 10px 0;
    }
    .group-name-content > img {
        height: 50px;
        width: 50px;
    }
    .group-name-content > p {
        font-weight: 600;
        margin-left: 5px;
    }
    .navigation-content{
        display: grid;
        grid-template-columns: auto auto;
        font-size: 14px;
        gap: 5px;
        padding: 5px 0;
        border-top: 5px solid #EBE8D5;
        border-bottom: 1px solid #EBE8D5;
    }
    .leave-group{
        margin-top: 10px;
    }
    .leave-group > h4 {
        font-size: 14px;
        padding: 5px 0;
        border-bottom: 1px solid #EBE8D5;
        margin-bottom: 10px;
    }
    .leave-group > span {
        font-size: 14px;
    }
    .leave-group > p {
        margin-top: 10px;
        color: red;
        cursor: pointer;
    }
    .leave-group > p:hover {
        opacity: 0.5;
    }
</style>