<?php if ($showField): ?>
    <?php $addlClass = str_replace(" ", "", $options['label']); ?>

    <?php foreach ((array)$options['children'] as $child): ?>
    <div class="collection-<?=$addlClass;?>" style="margin-top:-15px;">
        <?= $child->render() ?>
    </div>
    <?php endforeach; ?>
    <hr>
<?php endif; ?>