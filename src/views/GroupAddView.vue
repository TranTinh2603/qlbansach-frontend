<template>
    <div class="container">
        <div class="container-content-1">
            <div class="header-create-group-content">
                <h2>Create a Group</h2>
            </div>
            <div class="body-create-group-content">
                <form class="form-create-group">
                    <div class="field-group-name">
                        <label for="group-name">Group name<span>*</span></label>
                        <br>
                        <input type="text" name="group-name" id="group-name">
                    </div>
                    <div class="field-description">
                        <label for="description">Description<span>*</span></label>
                        <br>
                        <textarea type="text" name="description" id="description" cols="50" rows="5"></textarea>
                    </div>
                    <div class="field-rules">
                        <label for="rules">Rules</label>
                        <br>
                        <textarea name="rules" id="rules" cols="30" rows="10"></textarea>
                        <br>
                        <div class="select-show-rule">
                            <div class="option-rule-1">
                                <input type="radio" name="option" id="option1">
                                <label for="option1">Only show rules to new members</label>
                            </div>
                            <div class="option-rule-2">
                                <input type="radio" name="option" id="option2">
                                <label for="option2">Always show rules when members post new comments</label>
                            </div>
                        </div>
                    </div>
                    <div class="field-topic-group">
                        <label>Group or bookclub topic<span>*</span></label>
                        <div class="topic-group-1">
                            <select name="topic1" id="topic1">
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </div>
                        <div class="topic-group-2">
                            <select name="topic2" id="topic2">
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </div>
                    </div>
                    <div class="field-tags">
                        <label for="tags">Tags<span>(Comma separated: bookclub, fantasy, romance, etc)</span></label>
                        <br>
                        <input type="text" name="tags" id="tags">
                    </div>
                    <div class="field-satus">
                        <div class="option-satus-1">
                            <div>
                                <input type="radio" name="status" id="pubic">
                                <label for="public">This group is public.</label>
                            </div>
                            <span>Anyone can join this group. Anyone can view the group information and discussion board.</span>
                        </div>
                        <div class="option-satus-2">
                            <div>
                                <input type="radio" name="status" id="private">
                                <label for="private">This group is private.</label>
                            </div>
                            <span>New members must be approved by the group moderators. Anyone can see the group information, but only members can see the polls and discussion board. Only Moderators can invite new members.</span>
                        </div>
                        <div class="option-satus-3">
                            <div>
                                <input type="radio" name="status" id="secret">
                                <label for="secret">This group is secret.</label>
                            </div>
                            <span>New members must be approved by the group moderators. The group will not appear in search results or in the profiles of its members. Only members can see the group information, polls, and discussion board. Only Moderators can invite new members.</span>
                        </div>
                    </div>
                    <div class="field-country">
                        <label for="country">Country<span>*</span></label>
                        <select name="country" id="country">
                            <option value="">Việt Nam</option>
                        </select>
                    </div>
                    <div class="field-affiliated">
                        <label for="affiliated">Affiliated website<span>(optional. eg. https://www.goodreads.com)</span></label>
                        <input type="text" id="affiliated" name="affiliated">
                    </div>
                </form>
            </div>
        </div>
        <div class="container-content-2"></div>
    </div>
</template>