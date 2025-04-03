<div class="form-container">
    <h2>${formName}</h2>
    <form>
        <#list blocks as block>
            <fieldset>
                <legend>${block.name}</legend>
                <#list block.items as item>
                    <label for="${item.name}">${item.prompt}</label>
                    <input type="text" id="${item.name}" name="${item.columnName}" />
                </#list>
            </fieldset>
        </#list>
    </form>
</div>
